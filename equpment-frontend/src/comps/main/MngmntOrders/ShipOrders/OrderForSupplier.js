import DataToPDF from "./ExportToPdf";

const OrderForSuppliers = (props) => {
    const supplier = props.supplier
    const branch = props.branch
    const suppliersOrder = props.suppliersOrder

    return (
        <p>
            <p>supplier {supplier} </p>
            <p>branch {branch} </p>
            <p>order {suppliersOrder}</p>
        </p>
    )
}

export default OrderForSuppliers
