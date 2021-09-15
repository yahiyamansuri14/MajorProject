import React, { Component } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
export default class Video extends Component {
    render() {
        return (
            <div className="row mt-3 ">
                <div className="col-2"></div>
                <div className="col-8 border p-3">
                    <div className="row ">
                        <div className="d-flex flex-row">
                            <div>
                                <img
                                    alt="monster"
                                    src="https://robohash.org/2?set=set2&size=50x50"
                                    className="rounded-circle"
                                ></img>
                            </div>
                            <div> <span className="text-dark ml-3"><b>yahiya mansuri</b></span><br></br>
                                <span className="text-dark ml-3 mb-3"><b>Jun06,1998 at 03:30PM</b></span><br></br></div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <span>Change the visual order of specific flex items with a
                             handful of order utilities. We only provide options for
                             making an item first or last, as well as a reset to use
                             the DOM order. As order takes any integer value (e.g., 5),
                              add custom CSS for any additional values needed.</span><br></br>
                              {/*conditional rendaring here if multimedia is available then show this box */}
                              <img
                                    alt="monster"
                                    src="https://robohash.org/2?set=set2"
                                    className="border mt-3"
                                ></img>
                    </div>
                    <div className="row mt-2">
                        <div className="d-flex flex-row">
                            <ThumbUpAltIcon
                                fontSize="large"
                            ></ThumbUpAltIcon>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>

            </div>
        )
    }
}
