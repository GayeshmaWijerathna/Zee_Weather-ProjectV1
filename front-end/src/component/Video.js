export const Video = () => {
    const videos = [
        { src: "images/vedio/v01.mov", location: "Brinkin", date: "08 Oct, 09:30 AM" },
        { src: "images/vedio/v02.mov", location: "Lee point", date: "12 Oct, 10:00 AM" },
        { src: "images/vedio/v03.mov", location: "Moil", date: "08 Nov, 11:00 AM" },
        { src: "images/vedio/v04.mp4", location: "Karrara", date: "10 Nov, 08:00 AM" }
    ];

    return (
        <>
            <div className="fullwidth-block">
                <div className="container">
                    <h2 className="section-title">Live cameras</h2>
                    <div className="row">
                        {videos.map((video, index) => (
                            <div className="col-md-3 col-sm-6" key={index}>
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src={video.src} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">{video.location}</h3>
                                    <small className="date">{video.date}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
