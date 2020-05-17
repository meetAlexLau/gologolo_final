import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";

const GET_LOGOS = gql`
  {
    logos {
      _id
      logoName
      lastUpdate
    }
  }
`;

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            logoName
            logos
            backgroundColor
            dimensions
            borderColor
            borderWidth
            borderRadius
            padding
            margin
        }
    }
`;

const GET_LOGO_COMPONENTS = gql`
    {
        logoComponents{
            _id
            text
            fontSize
            height
            width
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $logoName: String!,
        $logos: [String]!,
        $backgroundColor: String!,
        $dimensions: Int!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                logoName: $logoName,
                logos: $logos,
                backgroundColor: $backgroundColor,
                dimensions: $dimensions,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

const ADD_LOGO_COMPONENT = gql`
    mutation addLogoComponent(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $height: Int!,
        $width: Int!) {
            addLogoComponent(
                text: $text,
                color: $color,
                fontSize: $fontSize,
                height: $height,
                width: $width) {
                    _id
                }   
        }
`;



class EditLogoScreen extends Component {

    constructor(props){
        super(props)

        this.state = {
            renderLogoName: "",
            renderText: "",
            renderColor: "",
            renderBackgroundColor: "",
            renderDimensions: "",
            renderBorderColor: "",
            renderBorderWidth: "",
            renderBorderRadius: "",
            renderFontSize: "",
            renderPadding: "",
            renderMargin: "",
            activated: false,
            selected: true,
            image: []
        }
    }

    render() {
        let logoComponent, imageComponent, logoName, text, color, fontSize, backgroundColor, dimensions, borderColor, borderWidth, borderRadius, padding, margin;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.activated == false) {
                        this.setState({renderLogoName: data.logo.logoName, renderBackgroundColor: data.logo.backgroundColor, renderDimensions: data.logo.dimensions+"px",
                            renderBorderColor: data.logo.borderColor,
                            renderBorderWidth: data.logo.borderWidth+ "px", renderBorderRadius: data.logo.borderRadius+"px", renderPadding: data.logo.padding+"px",
                            renderMargin: data.logo.margin+"px", activated:true});
                    }

                    return (
                            <div className="container">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                        <h3 className="panel-title">
                                            Edit Logo 
                                            <h5>{this.state.renderLogoName}</h5>
                                        </h3>
                                    </div>
                                    <div className="panel-body row">  
                                        <div className="col-3">
                                            <Query query={GET_LOGO_COMPONENTS} pollInterval={500}>
                                                {({loading, error, data}) => {
                                                    if (loading) return 'Loading...';
                                                    if (error) return `Error! ${error.message}`;                                                  
                                                return(
                                                <div>
                                                        <div className="form-group col-8">
                                                            <label htmlFor="imageComponent">Enter Image URL:</label>
                                                            <input type="text" className="form-control" name="imageComponent" ref={node => {
                                                                imageComponent= node;
                                                                }} placeholder={"url"} defaultValue={"url"} />
                                                            <button onClick={() => {this.setState({image: [...this.state.image, imageComponent.value]}); console.log(this.state.image   )}}>Upload</button>
                                                        </div>
                                                    <Mutation mutation={ADD_LOGO_COMPONENT} onCompleted={() => window.location.reload()}>
                                                    {(addLogoComponent) => (
                                                        <div>
                                                            <form onSubmit={e => {
                                                                e.preventDefault();
                                                                    if(logoComponent.value.length >1) {
                                                                        addLogoComponent({variables: {text: logoComponent.value, color: "#000000", fontSize: 12,
                                                                            height: 300, width: 300}});
                                                                            logoComponent.value = "";
                                                                    };
                                                            }}>
                                                                <div className="form-group col-8">
                                                                    <label htmlFor="text">Create Logo Text:</label>
                                                                    <input type="text" className="form-control" name="logoComponent" ref={node => {
                                                                        logoComponent= node;
                                                                        }} placeholder={"Text"} defaultValue={"Text"} />
                                                                    <button type="submit">Create</button>
                                                                </div>
                                                                <div className="form-group col-8">
                                                                    <label htmlFor="text">Text:</label>
                                                                    <input disabled={this.state.selected} type="text" className="form-control" name="text" ref={node => {
                                                                        text = node;
                                                                    }} onChange={() => this.setState({renderText: text.value})} placeholder={"text"} defaultValue={"text"} />
                                                                </div>                                                
                                                                <div className="form-group col-4">
                                                                    <label htmlFor="color">Color:</label>
                                                                    <input disabled={this.state.selected}type="color" className="form-control" name="color" ref={node => {
                                                                        color = node;
                                                                    }}onChange={() => this.setState({renderColor: color.value})} placeholder={"#000000"} defaultValue={"#000000"} />
                                                                </div>
                                                                <div className="form-group col-8">
                                                                    <label htmlFor="fontSize">Font Size:</label>
                                                                    <input disabled={this.state.selected} type="text" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                                                        fontSize = node;
                                                                    }} onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} placeholder={12} defaultValue={12} />
                                                                </div>
                                                                <div className="form-group col-8">
                                                                    <label htmlFor="height">Height:</label>
                                                                    <input disabled={this.state.selected} type="range" min="0" max="800" className="form-control" name="fontSize" ref={node => {
                                                                        fontSize = node;
                                                                    }} onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} placeholder={12} defaultValue={12} />
                                                                </div>
                                                                <div className="form-group col-8">
                                                                    <label htmlFor="fontSize">Width:</label>
                                                                    <input disabled={this.state.selected} type="text" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                                                        fontSize = node;
                                                                    }} onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} placeholder={12} defaultValue={12} />
                                                                </div>
                                                            </form>
                                                        </div>
                                                    )}</Mutation>
                                                </div>
                                            )}}</Query>
                                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                                        {(updateLogo, { loading, error }) => (
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, logoName: logoName.value, logos: data.logo.logos,
                                                                            backgroundColor: backgroundColor.value, dimensions: parseInt(dimensions.value), borderColor: borderColor.value,
                                                                            borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value),
                                                                            padding: parseInt(padding.value), margin: parseInt(margin.value)  } });
                                                logoName.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                                backgroundColor.value = "";
                                                dimensions.value ="";
                                                borderColor.value = "";
                                                borderWidth.value = "";
                                                borderRadius.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                            }}>
                                                <div className="form-group col-8">
                                                    <label htmlFor="text">Logo Name:</label>
                                                    <input type="text" className="form-control" name="logoName" ref={node => {
                                                        logoName= node;
                                                    }} onChange={() => this.setState({renderLogoName: logoName.value})} placeholder={data.logo.logoName} defaultValue={data.logo.logoName} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} placeholder={data.logo.backgroundColor} defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group col-6">
                                                <label htmlFor="dimensions">Dimensions:</label>
                                                    <input type="Number" min="1" max="800" className="form-control" name="dimensions" ref={node => {
                                                        dimensions = node; }} onInput={()=>{dimensions.value = clamp(dimensions.value, 1, 800);}}
                                                        onChange={() =>  {this.setState({renderDimensions: parseInt(dimensions.value)}); console.log(this.state)}} placeholder={data.logo.dimensions} defaultValue={data.logo.dimensions} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} onChange={() => this.setState({renderBorderColor: borderColor.value})} placeholder={data.logo.color} defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} onChange={() => this.setState({renderBorderWidth: parseInt(borderWidth.value)})} placeholder={data.logo.borderWidth} defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} onChange={() => this.setState({renderBorderRadius: parseInt(borderRadius.value)})} placeholder={data.logo.borderRadius} defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} onChange={() => this.setState({renderPadding: parseInt(padding.value)})} placeholder={data.logo.padding} defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} onChange={() => this.setState({renderMargin: parseInt(margin.value)})} placeholder={data.logo.margin} defaultValue={data.logo.margin} />
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                                <button type="button" className="btn btn-primary"
                                                    id = "exportTrigger"
                                                    onClick={() => {
                                                        var logo = document.querySelector("#exportLogo");
                                                        html2canvas(logo,{scrollY: -window.scrollY, scrollX:-window.scrollX, useCORS: true,allowTaint: true}).then(canvas => {
                                                            var a = document.createElement("a");
                                                            document.body.appendChild(canvas);
                                                            a.href = canvas.toDataURL("image/png");
                                                            a.download = data.logo.logoName+".png";
                                                            a.click();
                                                            document.body.removeChild(canvas);
                                                        });
                                                    }}>Export</button>
                                            </form>
                                        )}</Mutation>
                                        </div>                                        
                                        <div onDrop={(ev) => {
                                                            ev.preventDefault();
                                                            var data = ev.dataTransfer.getData("URL");
                                                            ev.target.appendChild(document.getElementById(data));
                                                        }} id="exportLogo"  style={{
                                            backgroundColor: this.state.renderBackgroundColor,
                                            borderColor: this.state.renderBorderColor,
                                            borderStyle: "solid",
                                            borderWidth: this.state.renderBorderWidth,
                                            borderRadius: this.state.renderBorderRadius,
                                            padding: this.state.renderPadding,
                                            margin: this.state.renderMargin,
                                            height: this.state.renderDimensions,
                                            width: this.state.renderDimensions,
                                            position: "relative"
                                        }} onClick={() => {this.setState({selected: true})}}>
                                            <Query query={GET_LOGO_COMPONENTS} pollInterval={500}>
                                                {({loading, error, data})=> {
                                                    if (loading) return 'Loading...';
                                                    if (error) return `Error! ${error.message}`;  
                                                    return (
                                                        <div style={{height: this.state.renderDimensions, width:this.state.renderDimensions}}>
                                                            {data.logoComponents.map((logoComp, index) => (
                                                                <Draggable bounds="parent" onClick={() => {this.setState({selected: false}); console.log(this.state)}}> 
                                                                    <div key={index} id={index} 
                                                                    style={{color: logoComp.color, fontSize: logoComp.fontSize,
                                                                            position:"absolute", display:"flex", justifyContent:"center", alignItems:"center",
                                                                            transform: (logoComp.height, logoComp.width)}}
                                                                    >{logoComp.text}</div>
                                                                </Draggable>
                                                            ))}
                                                            {this.state.image.map((img) =>(
                                                                <Draggable bounds="parent">
                                                                    <img draggable="false" style={{height:"50%", width:"50%"}}src={img}></img>
                                                                </Draggable>
                                                            ))}
                                                        </div>
                                                    );
                                                }}
                                            </Query>
                                        </div>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                </div>
                            </div>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;