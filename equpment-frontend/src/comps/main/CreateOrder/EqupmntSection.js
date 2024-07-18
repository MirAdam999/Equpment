import { useURL } from "../../context/URL";
import { useToken } from "../../context/Token";
import { useState, useEffect } from "react";
import Equpment from "./Equpment";
import './EqupmntSection.css'
import { MdArrowRight } from "react-icons/md";

const EqupmentSection = (props) => {
    const cat = props.cat
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [equpment, setEqupment] = useState([]);
    const [showEqupment, setShowEqupment] = useState(false);

    useEffect(() => {
        const fetchEqupment = async () => {
            try {
                const result = await fetch(`${storedURL}/get_equpment_by_category/${parseInt(cat.id)}/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('equpment' in data) {
                    setEqupment(data.equpment);
                } else if ('not_found' in data) {
                    setEqupment(['none']);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: No equpment on unknown');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchEqupment();
    }, [])

    const showOrHideEqupment = () => {
        setShowEqupment(!showEqupment);
    }

    return (
        <div>
            <button className='equpment-cat-btn' onClick={showOrHideEqupment}>
                <p>{cat.name}</p>
                <MdArrowRight className="arrow-icon" id={showEqupment ? 'arrow-icon-down' : ''} />
            </button>
            <div className='section-content' id={showEqupment ? 'open' : 'closed'}>
                {showEqupment && <Equpment equpment={equpment} />}
            </div>
        </div >
    )
}

export default EqupmentSection