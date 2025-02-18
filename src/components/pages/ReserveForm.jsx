import { useState } from "react";
import "../../styled/ReserveForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMagnifyingGlass, faPerson } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { addMonths, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

const CustomRangeInput = React.forwardRef(({ onClick, startDate, endDate }, ref) => {
    
    const defaultCheckOutDate = new Date(startDate);
    defaultCheckOutDate.setDate(defaultCheckOutDate.getDate() + 1);
    const checkoutDisplay = endDate ? endDate : defaultCheckOutDate;
    const checkInWeekday = format(startDate, 'EEEE');
    const checkInDate = format(startDate, 'MM/dd/yyyy');
    const checkOutWeekday = format(checkoutDisplay, 'EEEE');
    const checkOutDate = format(checkoutDisplay, 'MM/dd/yyyy');
    
    return (
      <div className="date-range-wrapper" onClick={onClick} ref={ref}>
        <div className="checkIn-wrapper" role="button" tabIndex="0">
          <span className="check-icon">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
          <div className="checkIn-info">
            <div className="checkIn-weekday">{checkInWeekday}</div>
            <div className="checkIn-date">{checkInDate}</div>
          </div>
        </div>
        <div className="checkOut-wrapper" role="button" tabIndex="0">
          <span className="check-icon">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
          <div className="checkOut-info">
            <div className="checkOut-weekday">{checkOutWeekday}</div>
            <div className="checkIn-date">{checkOutDate}</div>
          </div>
        </div>
      </div>
    );
  });
CustomRangeInput.displayName="CutomRangeInput";

function ReserveForm() {

    const [dateRange, setDateRange] = useState([new Date(), null]);
    const [startDate, endDate] = dateRange;

    const [occupancy, setOccupancy] = useState({ adults:2, children: 0});
    const [occupancyOpen, setOccupancyOpen] = useState(false);
    const incrementAdult = () => {
    setOccupancy(prev => ({ ...prev, adults: prev.adults + 1}));   
    };
    const decrementAdult = () => {
        setOccupancy(prev => ({ ...prev, adults: prev.adults > 1 ? prev.adults - 1 : 1 }));
    };
    
      const incrementChild = () => {
        setOccupancy(prev => ({ ...prev, children: prev.children + 1 }));
    };
      const decrementChild = () => {
        setOccupancy(prev => ({ ...prev, children: prev.children > 0 ? prev.children - 1 : 0 }));
    };
  
  
    return(
        <div className="reservation-form-container">
            <div className="reservation-form-background">
                <div className="reservation-form-wrapper">
                    <h2>Hotels</h2>
                    <form className="reservation-form">
                        <div className="search-box">
                            <div className="search-wrapper">
                            <span className="search-icon">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                            <input type="text" placeholder="어디로 가시나요" />
                            </div>
                        </div>
                        <div className="date-box">
                        <DatePicker
                selected={startDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={new Date()}
                maxDate={addMonths(new Date(), 5)}
                // customInput에 커스텀 인풋 컴포넌트를 전달합니다.
                customInput={<CustomRangeInput startDate={startDate} endDate={endDate} />}
                />
                        </div>
                        <div className="occupancy-box">
                        <div className="occupancy-wrapper" role="button" tabIndex="0" onClick={() => setOccupancyOpen(true)}>
                            <span className="occupancy-icon">
                            <FontAwesomeIcon icon={faPerson}/>
                            </span>
                            <div className="occupancy-number">
                                {`성인 ${occupancy.adults}명`}
                            </div>                         
                               
                        </div>
                                      {/* 인원수 선택 모달 */}
              {occupancyOpen && (
                <div className="occupancy-modal">
                  <div className="occupancy-modal-content">
                    <div className="occupancy-modal-wrapper">
                      <div className="occupancy-modal-line">
                      
                        <h3>성인</h3>
                        <div className="occupancy-modal-button-wrapper">
                        <button type="button" onClick={decrementAdult}>-</button>
                        <p>{occupancy.adults}</p>
                        <button type="button" onClick={incrementAdult}>+</button>
                      </div>
                      </div>
                      <div className="occupancy-modal-line">
                        <h3>아동</h3>
                        <div className="occupancy-modal-button-wrapper">
                        <button type="button" onClick={decrementChild}>-</button>
                        <p>{occupancy.children}</p>
                        <button type="button" onClick={incrementChild}>+</button>
                      </div>
                    </div>
                    </div>
                    <div className="occupancy-modal-close-wrapper">
                    <button className="occupancy-modal-close" type="button" onClick={() => setOccupancyOpen(false)}>확인</button>
                    </div>
                  </div>
                </div>
              )}
                        </div>
                    </form>
                </div>
            </div>
        </div>   
    )
}

export default ReserveForm;