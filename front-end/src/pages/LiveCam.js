export const LiveCam = () => {


    const getRandomDate = () => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - Math.floor(Math.random() * 30)); // Randomly subtract up to 30 days

        const hours = Math.floor(Math.random() * 12) + 1; // Random hour from 1 to 12
        const minutes = Math.floor(Math.random() * 60); // Random minute from 0 to 59
        const amPm = Math.random() > 0.5 ? ' AM' : ' PM'; // Random AM/PM

        // Format the date and time
        return `${pastDate.getDate()} ${pastDate.toLocaleString('default', { month: 'short' })}, ${hours}:${minutes.toString().padStart(2, '0')}${amPm}`;
    };

    return(

        <>

            <main className="main-content">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>Live cameras</span>
                    </div>
                </div>

                <div className="fullwidth-block">
                    <div className="container">
                        <div className="filter">
                            <div className="country filter-control">
                                <label htmlFor="">Country</label>
                                <span className="select control">
									<select name="" id="">
										<option value="">Australia</option>
									</select>
								</span>
                            </div>
                            <div className="count filter-control">
                                <label htmlFor="">Show per page</label>
                                <span className="select control">
									<select name="" id="">
										<option value="">1</option>
										<option value="">2</option>
										<option value="">3</option>
										<option value="">4</option>
										<option value="">5</option>
										<option value="">6</option>
										<option value="">7</option>
										<option value="">8</option>
										<option value="">9</option>
										<option value="">10</option>
									</select>
								</span>
                            </div>
                            <div className="quality filter-control">
                                <label htmlFor="">Only high quality</label>
                                <span className="select control">
									<select name="" id="">
										<option value="">Yes</option>
										<option value="">No</option>
									</select>
								</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v08.mov" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">Moodleigh</h3>

                                    <small className="date">{getRandomDate()}</small>



                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v07.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">East Point</h3>

                                    <small className="date">{getRandomDate()}</small>



                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v06.mov" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">Parap</h3>

                                    <small className="date">{getRandomDate()}</small>



                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v01.mov" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">Channel Island</h3>

                                    <small className="date">{getRandomDate()}</small>



                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v04.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">Daly</h3>

                                    <small className="date">{getRandomDate()}</small>



                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v03.mov" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">Hotham</h3>

                                    <small className="date">{getRandomDate()}</small>



                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v05.mov" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">Mapuru</h3>

                                    <small className="date">{getRandomDate()}</small>



                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v02.mov" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </figure>
                                    <h3 className="location">Mount Bundey</h3>

                                    <small className="date">{getRandomDate()}</small>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </>
    )
}