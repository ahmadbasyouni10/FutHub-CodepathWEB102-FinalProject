const Avatar = ({big}) => {
    return (
        <div className={`${big ? ' w-36 h-36' : 'w-14'} h-14 overflow-hidden rounded-full`}>
            <img className="object-cover w-full h-full" src="https://img.freepik.com/free-photo/emotions-people-concept-headshot-serious-looking-handsome-man-with-beard-looking-confident-determined_1258-26730.jpg" alt="Avatar"></img>
        </div>
    )
};

export default Avatar;