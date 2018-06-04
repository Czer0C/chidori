import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { timer } from './script';

class BestSellerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: []
        }
    }

    componentDidMount() {
        //timer();
        this.getAllAuction();
    }

    componentDidUpdate() {
        timer();
    }

    getAllAuction() {
        fetch('/auction/getAuctionSession', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            } 
        }).then(res => res.json())
            .then(json => {
                this.setState({
                    obj: json
                });
            });
    }

    render() {

        const gridStyle = {
            display: 'grid',
            grid: 'auto / auto auto auto',
            gridGap: '10px',            
        }

        const arr = this.state.obj;

        return(
            <div className="best_sellers box_shadow">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="tabbed_container">
                                <div className="clearfix padding">
                                    <div className="new_arrivals_title">Sản phẩm đang đấu giá</div>                                                        
                                    <div className="tabs_line demo"><span></span></div>
                                </div>

                                <div style={gridStyle}>
                                {
                                    arr.map((item, index) => 
                                    // <div className="row item_holder" >
                                        // <div className="col">
                                            <div className="bestsellers_item">
                                                <div className="bestsellers_item_container d-flex flex-row align-items-center justify-content-start">
                                                    <div className="bestsellers_image"><img src={item.p[0].productImage} alt=""/></div>
                                                    <div className="bestsellers_content">
                                                        
                                                        <div className="bestsellers_category"><a href="#">{item.productType}</a></div>
                                                        <div className="bestsellers_name"><a href="#">Item {index}</a></div>
                                                        <div className="bestsellers_price">{item.currentPrice} VND</div>
                                                        <div className="deals_timer_content ml-auto">
                                                            <div className="deals_timer_box clearfix" data-target-time={item.bidTime}>
                                                                <div className="deals_timer_unit">
                                                                    <div id="deals_timer1_hr" className="deals_timer_hr"></div>
                                                                    <span>hours</span>
                                                                </div>
                                                                <div className="deals_timer_unit">
                                                                    <div id="deals_timer1_min" className="deals_timer_min"></div>
                                                                    <span>mins</span>
                                                                </div>
                                                                <div className="deals_timer_unit">
                                                                    <div id="deals_timer1_sec" className="deals_timer_sec"></div>
                                                                    <span>secs</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bid_btn">
                                                            <NavLink to={'Auction/'+item.p[0].productType+'/'+item.p[0].productID}>Đấu giá ngay</NavLink>
                                                            {/* <a href="javascript:void(0)"></a> */}
                                                        </div>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        // </div>
                                    // </div>
                                    )
                                }
                                </div>
                                                                
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BestSellerComponent;