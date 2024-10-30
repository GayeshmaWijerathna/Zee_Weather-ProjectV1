export const Photoes = () => {
    const photos = [
        { img: "images/01.jpg", title: "Cloudy Skies", description: "The skies are overcast, with a dense layer of clouds covering the sun.", rating: 60 },
        { img: "images/02.jpg", title: "Cloudy Afternoon", description: "A cloudy afternoon with thick clouds, bringing a cooler ambiance.", rating: 60 },
        { img: "images/03.jpeg", title: "Gloomy Clouds", description: "A dark and cloudy atmosphere, hinting at possible rain.", rating: 60 },
        { img: "images/04.jpeg", title: "Overcast Weather", description: "A complete blanket of clouds, with no sun in sight.", rating: 60 },
        { img: "images/05.jpg", title: "Thunderstorm Alert", description: "Lightning illuminates the sky as thunder echoes in the distance.", rating: 60 },
        { img: "images/06.jpg", title: "Rainy Day", description: "Steady rain falls, creating puddles and a fresh atmosphere.", rating: 60 },
        { img: "images/07.jpg", title: "Sunny and Clear", description: "The sun shines brightly in a clear blue sky.", rating: 60 },
        { img: "images/08.jpg", title: "Bright Sunny Day", description: "A beautiful sunny day with clear skies, perfect for outdoor activities.", rating: 60 },
        { img: "images/09.jpg", title: "Snowfall", description: "Snowflakes gently fall, covering the ground in a soft, white layer.", rating: 60 }
    ];

    return (
        <>
            <main className="main-content">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>Photos</span>
                    </div>
                </div>

                <div className="fullwidth-block">
                    <div className="container">
                        <div className="row">
                            {photos.map((photo, index) => (
                                <div className="col-md-6" key={index}>
                                    <div className="photo">
                                        <div className="photo-preview photo-detail" style={{ backgroundImage: `url(${photo.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        <div className="photo-details">
                                            <h3 className="photo-title"><a href="#">{photo.title}</a></h3>
                                            <p>{photo.description}</p>
                                            <div className="star-rating" title={`Rated ${photo.rating / 20} out of 5`}>
                                                <span style={{ width: `${photo.rating}%` }}>
                                                    <strong className="rating">{photo.rating / 20}</strong> out of 5
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
