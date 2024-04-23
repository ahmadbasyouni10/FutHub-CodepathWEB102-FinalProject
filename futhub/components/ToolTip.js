const ToolTip = ({ children, content }) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute text-xs left-0 bg-gray-400 text-white dark:text-gray-800 rounded p-1 invisible group-hover:visible" style={{ top: '100%', whiteSpace: 'nowrap', transform: 'translateY(10px)' }}>
                {content}
            </div>
        </div>
    );
};

export default ToolTip;