import { useURL } from "../../../context/URL";
import { useToken } from "../../../context/Token";
import { useState, useRef, useEffect } from "react";
import './OrderForSupplier.css'
import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { FaFileWord } from "react-icons/fa";


const OrderForSuppliers = (props) => {
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const supplier = props.supplier;
    const branch = props.branch;
    const area = props.area;
    const order = Array.isArray(props.order) ? props.order : [];
    const today = new Date();
    const dateString = today.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const totalPrice = order.reduce((sum, item) => sum + item.detail_price_for_order, 0);
    const elementRef = useRef();
    const [approved, setApproved] = useState(false);
    const [unapprovedItemFlag, setUnapprovedItemFlag] = useState(false);

    useEffect(() => {
        const hasUnapprovedItems = order.some(item => !item.approved_to_ship);
        setUnapprovedItemFlag(hasUnapprovedItems);
    }, [order]);

    const approveSent = async () => {
        try {
            const result = await fetch(`${storedURL}/send_order_to_supplier/`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    details: order.map((detail) => (detail.id))
                })
            });
            const data = await result.json();
            if ('sent_to_supplier' in data) {
                setApproved(true);
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: Unknown error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const convertHtmlToWord = (content, fileName = `order_for_${supplier.name}_${branch.name}_${dateString}.docx`) => {

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="he" dir="rtl">
            <head>
                <meta charset="UTF-8" />
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@100..900&display=swap" rel="stylesheet">
                <title>Document</title>
                <style>
          .order-for-supplier {
              display: flex;
              flex-direction: column;
              margin: 1rem;
              text-align: center;
              align-items: center;
                  width: 595px;
          }
          .order-for-supplier-top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 50px;
          }
          .order-for-supplier-top div {
              display: flex;
              flex-direction: column;
              align-items: start;
          }
          .order-for-supplier-top p {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: baseline;
              margin: 0;
              gap: 10px;
          }
          .data-span {
              font-weight: 600;
          }
          #supplier-name {
              font-size: large;
              color: #074173;
          }
          .total-price {
              font-weight: 600;
              color: #074173;
          }
              #total-price-sum{
              direction:ltr;
              }
          .order-for-supplier-btm td,
          .order-for-supplier-btm th {
              padding-left: 5px;
              padding-right: 5px;
          }
          .order-for-supplier-btm {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }

          .order-for-supplier-btm table {
    border-collapse: collapse;
    border: solid 1px black;
    direction: rtl;
}

.order-for-supplier-btm th,
.order-for-supplier-btm td,
.order-for-supplier-btm tr {
    border: solid 1px black;
    border-collapse: collapse;
}

#comments{
width: 150px}

.order-for-supplier-top table {
    width: 610px;
    border: transparent;
}

.order-for-supplier-top tr,
.order-for-supplier-top td,
.order-for-supplier-top th {
    border: transparent;
    text-align: left;
}

#right {
    text-align: right;
}
                </style>
            </head>
            <body>${content}</body>
        </html>`;

        const converted = htmlDocx.asBlob(htmlContent);
        saveAs(converted, fileName);
    }

    const handleDownload = () => {
        if (elementRef.current) {
            convertHtmlToWord(elementRef.current.innerHTML);
        }
    };

    const page = (
        <div className="order-for-supplier" ref={elementRef}>
            <div className="order-for-supplier-top">
                <table>
                    <tr><td id="right"> עבור ספק</td>
                        <td className="data-span" id='supplier-name'>{supplier.name}</td>
                    </tr>
                    <tr> <td id="right">תאריך</td>
                        <td className="data-span">{dateString}</td>
                    </tr>

                    <tr> <td id="right">מחוז</td>
                        <td className="data-span">{area.name}</td>
                    </tr>
                    <tr> <td id="right">סניף</td>
                        <td className="data-span">{branch.name}</td>
                    </tr>
                    <tr> <td id="right">כתובת</td>
                        <td className="data-span">{branch.address}</td>
                    </tr>

                </table>
            </div>
            <div className="order-for-supplier-btm">
                <p></p>
                <table>
                    <thead >
                        <th id='order-for-supplier-btm-th'>שם פריט</th>
                        <th id='order-for-supplier-btm-th'>מחיר יחידה בש"ח</th>
                        <th id='order-for-supplier-btm-th'>כמות</th>
                        <th id='order-for-supplier-btm-th'>מחיר סה"כ</th>
                        <th id='order-for-supplier-btm-th'>הערות</th>
                    </thead>
                    <tbody>
                        {order.map((item) => (
                            <tr id={item.approved_to_ship ? '' : 'not-approved-item'} key={item.id}>
                                <td>{item.detail_name}</td>
                                <td>{item.detail_price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.detail_price_for_order}</td>
                                <td id="comments">{item.approved_to_ship ? '' : 'הפריט לא מאושר. יש לאשר/לדחות פריט לניהול הזמנות'}</td>
                            </tr>
                        ))}
                        <tr className="total-price">
                            <td colSpan={4}>סה"כ</td>
                            <td id='total-price-sum'>{totalPrice.toLocaleString()} ש"ח</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >)

    const close = () => {
        props.onClose();
        props.setRefreshFlag(!props.refreshFlag);
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="close-and-export">
                    <button className="close-btn" onClick={close}>X</button>
                    <button className="mark-sent" onClick={approveSent} disabled={unapprovedItemFlag}>אשר שליחה לספק</button>
                    <button className="to-word" onClick={handleDownload}>יצוא לקובץ וורד <FaFileWord /></button>
                </div>
                {approved && <p className="sucsess-msg" style={{ fontSize: '1.4rem' }}>הפריטים סומנו כנשלח</p>}
                {page}
            </div>
        </div >
    )
}

export default OrderForSuppliers
