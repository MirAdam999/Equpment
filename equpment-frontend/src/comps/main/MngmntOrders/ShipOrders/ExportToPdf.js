import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DataToPDF = () => {
    const exportToPDF = () => {
        const input = document.getElementById('pdf-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('download.pdf');
        });
    };

    return (
        <div>
            <div id="pdf-content">
                <h1>My Data</h1>
                <p>This is the data I want to convert to PDF.</p>
                {/* Add more data as needed */}
            </div>
            <button onClick={exportToPDF}>Export to PDF</button>
        </div>
    );
};

export default DataToPDF;