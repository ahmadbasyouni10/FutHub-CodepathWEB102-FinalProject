const Card = ({children, Padding}) => {
    return (
        <div className={`bg-white shadow-md shadow-gray-400 rounded-lg ${Padding ? 'p-4': ''} mb-6`}>
        {children}
        </div>
    );
    }


export default Card;