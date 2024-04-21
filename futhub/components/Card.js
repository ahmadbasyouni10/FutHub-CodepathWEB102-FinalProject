const Card = ({children, Padding}) => {
    return (
        <div className={`bg-white dark:bg-dark dark:text-white shadow-md shadow-gray-400 dark:shadow-gray-800 rounded-lg ${Padding ? 'p-4': ''} mb-6`}>
        {children}
        </div>
    );
    }


export default Card;