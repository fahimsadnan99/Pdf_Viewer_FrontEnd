import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import throttle from 'lodash/throttle';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewPdf = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const nextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const [initialWidth, setInitialWidth] = useState(null);
    const pdfWrapper = useRef(null);

    const setPdfSize = () => {
        if (pdfWrapper && pdfWrapper.current) {
            setInitialWidth(pdfWrapper.current.getBoundingClientRect().width);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', throttle(setPdfSize, 3000));
        setPdfSize();
        return () => {
            window.removeEventListener('resize', throttle(setPdfSize, 3000));
        };
    }, []);

    return (
        <div>
        
            <div className="controls">
                <button onClick={prevPage} disabled={pageNumber === 1}>
                    {'<<'}
                </button>
                <b>{pageNumber}</b>
                <button onClick={nextPage} disabled={pageNumber === numPages}>
                    {'>>'}
                </button>

                <div id="placeholderWrapper" />
                <div id="pdfWrapper" ref={pdfWrapper}>
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onContextMenu={(e) => e.preventDefault()}
                        className="pdf-container"
                    >
                        <Page pageNumber={pageNumber} width={initialWidth} />
                    </Document>
                </div>
            </div>
        </div>
    );
};


export default ViewPdf;