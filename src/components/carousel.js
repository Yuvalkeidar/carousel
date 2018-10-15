import React from 'react';

//Important note - the first and last element will never show
//I used them to make the title row infinte for images they could be used

//my real list is 0 - length-2 i added the two first elements as last
//elements for illustrate the left and right animation, I did jump on
//length -2 to get position of element with left and then translate
//for animation

export class Carousel extends React.Component {
    constructor(props) {
      super(props);

        this.state ={
        //activeIndex is for mark the active prev and next class
        //this will help for title clicking
        //value 1 is defualt for carousel which have "brothers" from left
        //and right
          activeIndex:1,
        //title left and Image left is declarion for infinite slider which make
        //the movement without possible to see the change
          titleLeft:0,
          imageLeft:0,
        //title transform and Image transform is declarion for infinite slider
        //which make the movement animation
        //imageTransform is -100 for defualt for carousel which have
        //"brothers" from left and right
          titleTransform:0,
          imageTransform:-100,
        };

    }
    componentDidMount(){
    }
    //infinte slider when mouse over will not continue slide
    infinteSlider(){
        if (this.state.userActive === true)
            clearInterval(this.intervalId);
        else
            this.arrowLeftClick.call(this);
    }
    //keep moving when user doesn't over on carousel
    mouseOut() {
      this.setState({
          userActive: false,
      });
      this.intervalId = setInterval(this.infinteSlider.bind(this), 5000);
    }
    //stop when user over on carousel to prevent from sliding when
    //user using carousel
    mouseOver() {
      clearInterval(this.intervalId);
      this.setState({
          userActive: true,
      });
      this.intervalId = '';
    }
    arrowRightClick(){
        let activeIndex = this.state.activeIndex;
        let imageTransform = this.state.imageTransform;
        let titleTransform = this.state.titleTransform;
        let titleLeft = this.state.titleLeft;
        let imageLeft = this.state.imageLeft;

        //clicking right animate slide right
        //start on 1 is the first element which is the lentgh -1 as well
        //transport to the end of the list for this situation and
        //change left for title and image to this pos by this calculation
        //else keep reducing active index
        if (activeIndex === 1){
            activeIndex = this.props.length - 2;
            titleLeft -= (33.33333 * (this.props.length - 2));
            imageLeft -= (100 * (this.props.length - 2));
        }
        else{
            activeIndex--;
        }

        //animate the the movements always
        //image get full screen so I'll move it by 100 percent
        //title get 1/3 from screen I'll move it by 33.3333 percent
        imageTransform += 100;
        titleTransform += 33.33333;

        //keep changes and make applying them on screen
        this.setState({
            activeIndex:activeIndex,
            titleLeft: titleLeft,
            imageLeft:imageLeft,
            titleTransform:titleTransform,
            imageTransform:imageTransform
        });
        // this.props.select(activeIndex,titleLeft,imageLeft,titleTransform,imageTransform);

    }
    arrowLeftClick(){
        let activeIndex = this.state.activeIndex;
        let imageTransform = this.state.imageTransform;
        let titleTransform = this.state.titleTransform;
        let titleLeft = this.state.titleLeft;
        let imageLeft = this.state.imageLeft;

        //clicking left animate slide left
        //start on lentgh -2 is the first element which is the 0 index as well
        //transport to the first element for this situation which duplicate
        //as well length -1 change left for title and image to this pos
        //by this calculation else keep reducing active index

        if (activeIndex === this.props.length - 2){
            activeIndex = 1;
            titleLeft += (33.33333 * (this.props.length - 2));
            imageLeft += (100 * (this.props.length - 2));
        }
        else{
            activeIndex++;
        }

        //animate the the movements always
        //image get full screen so I'll move it by 100 percent
        //title get 1/3 from screen I'll move it by 33.3333 percent
        imageTransform -= 100;
        titleTransform -= 33.33333;

        //keep changes and make applying them on screen
        this.setState({
            activeIndex:activeIndex,
            titleLeft:titleLeft,
            imageLeft:imageLeft,
            titleTransform:titleTransform,
            imageTransform:imageTransform
        });
        // this.props.select(activeIndex,titleLeft,imageLeft,titleTransform,imageTransform);

    }
    classSelector(data){
        //decide prev active and next classes
        return data.className + " " + (( data.index===this.state.activeIndex+1 || (this.state.activeIndex+1 > this.props.length - 1 && data.index === 0 ))
                                    ? 'next' : (data.index===this.state.activeIndex-1 || (this.state.activeIndex-1 < 0 && data.index === this.props.length - 1  ))
                                        ? 'prev' : (data.index===this.state.activeIndex)
                                            ?'active':'');
    }
    //select image Element from his title
    selectElementByTitle(e){
        //use classes for choosing which element selected by title
        const className = e.currentTarget.className;
        if((""+className+"").indexOf("prev") !== -1)
            this.arrowRightClick.call(this);
        if((""+className+"").indexOf("next") !== -1)
            this.arrowLeftClick.call(this);
    }
    //render images
    renderItems(data,index){
        return(
            <li className={this.classSelector({className:'image-slider-item',index:index})} data-imagenumber={data.number} key={index}>
                <img src={data.url}/>
            </li>
        )
    }
    //render titles
    renderTitles(data,index){
        return(
            <li className={this.classSelector({className:'title-slider-item',index:index})} data-imagenumber={data.number} key={index} onClick={this.selectElementByTitle.bind(this)}>
                <div>{data.title}</div>
            </li>
        )
    }
    render() {
        //every render decide what would be transform and left css properties
        let imageStyle = {
            transform:'translate3d(' + this.state.imageTransform +'%,0px,0px)',
            left:this.state.imageLeft+'%'
        }
        let titleStyle = {
            transform:'translate3d(' + this.state.titleTransform +'%,0px,0px)',
            left:this.state.titleLeft+'%'
        }
        return (
            <div className="carousel-wrapper" onMouseOut={this.mouseOut.bind(this)} onMouseOver={this.mouseOver.bind(this)}>
                <div className="button-prev" onClick={this.arrowLeftClick.bind(this)}>
                    <i className="arrow-left"></i>
                </div>
                <ul className="image-slider" style={imageStyle}>
                    {this.props.images.map(this.renderItems.bind(this))}
                </ul>
                <div className="titles-conatiner">
                    <ul className="title-slider" style={titleStyle}>
                        {this.props.images.map(this.renderTitles.bind(this))}
                    </ul>
                </div>
                <div className="button-next" onClick={this.arrowRightClick.bind(this)}>
                    <i className="arrow-right"></i>
                </div>
            </div>
        );
    }
}
