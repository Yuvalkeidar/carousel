import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Carousel } from '../components/carousel';
import { fetchData } from '../actions/index';


// list of word and number of apperances in url
class CarouselContainer extends Component{
  constructor(props) {
    super(props)
    //get data from external file
    props.fetchData();
  }
  render(){
    return(
        <div className="main-container">
            <Carousel
            images = {this.props.images}
            length = {this.props.images.length}
            />
        </div>
     );
  }
}


// bind to redux action creator
function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchData },dispatch);
}

function mapStateToProps(state){
  return {
    images:state.images
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CarouselContainer);
