// import React from 'react';
// import './_imageSlider.scss';
// // import 'jssor-slider';
// import img_header1 from '../../images/home/header1.png';
// import img_header2 from '../../images/home/header2.png'
// class ImageSlider extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {id: props.id, sliderObj:null};
//   }
//   componentDidMount() {
//     var jssor_1_SlideshowTransitions = [
//         {$Duration:800,$Opacity:2}
//       ];
//     var options = {
//         $AutoPlay: 1,
//         $DragOrientation: 0,
//         $SlideshowOptions: {
//         $Class: $JssorSlideshowRunner$,
//             $Transitions: jssor_1_SlideshowTransitions,
//             $TransitionsOrder: 1
//           },
//         $ArrowNavigatorOptions: {
//             $Class: $JssorArrowNavigator$
//           },
//         $BulletNavigatorOptions: {
//             $Class: $JssorBulletNavigator$
//           }
//     };

//     var slider = new $JssorSlider$(this.state.id,options);
//     this.setState({sliderObj:slider});
//     // this.ScaleSlider.bind(this);
// //    $Jssor$.$AddEvent(window, "load", this.ScaleSlider);
//     $Jssor$.$AddEvent(window, "resize", this.ScaleSlider.bind(this));
// //    $Jssor$.$AddEvent(window, "orientationchange", this.ScaleSlider);

//   }
//   ScaleSlider() {
//     var slider = this.state.sliderObj;
//     var containerElement = slider.$Elmt.parentNode.parentNode;
//     var containerWidth = containerElement.clientWidth;
//     var containerHeight = containerElement.clientHeight;
//     // slider.$ScaleWidth(containerWidth);
//     // slider.$ScaleHeight(containerWidth);
//   }
//   render(){
//     console.log(this.state.sliderObj);
//     return (
//         <div id={this.state.id} className="jssor-slider-container">
//             <div data-u="slides" className="jssor-slider">
//                 <div>
//                     <img data-u="image" src={img_header1} />
//                 </div>
//                 <div>
//                     <img data-u="image" src={img_header2} />
//                 </div>
//             </div>
//         </div>
//     );
//   }
// };

// export default ImageSlider;
