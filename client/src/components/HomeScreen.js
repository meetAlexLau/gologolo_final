import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Mutation} from 'react-apollo';
const GET_LOGOS = gql`
  {
    logos {
      _id
      logoName
      lastUpdate
    }
  }
`;
const ADD_LOGO = gql`
    mutation AddLogo(
        $logoName: String!
        $logos: [String]!,
        $backgroundColor: String!,
        $dimensions: Int!
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            logoName: $logoName,
            logos: $logos,
            backgroundColor: $backgroundColor,
            dimensions: $dimensions,
            borderColor: $borderColor,
            borderWidth: $borderWidth,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin) {
            _id,    
            lastUpdate
        }
    }
`;

const compareDates = (ds1, ds2) => {
    let date1 = new Date(ds1);
    let date2 = new Date(ds2);

    if(date1 < date2){
        return -1;
    } else {
        return 1;
    }
};

class HomeScreen extends Component {
    render() {
        let newLogoText;
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row">
                            <div className="col s4">
                                <h3>Recent Work</h3>
                                {data.logos.sort((x, y) => -compareDates(x.lastUpdate, y.lastUpdate)).map((logo, index) => (
                                    <div key={index} className='home_logo_link'>
                                        <Link to={`/view/${logo._id}`} className="home_logo_link_text" style={{ cursor: "pointer" }}>{logo.logoName}</Link>
                                    </div>
                                ))}
                            </div>
                            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('../home') }>
                            {(addLogo) => ( 
                            <div className="col s8">
                                <div id="home_banner_container">
                                    Logo<br />
                                    Maker <h5>Special Edition</h5>
                                </div>
                                <div>
                                    <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        console.log(data);
                                        if(newLogoText.value.length > 1) {
                                            addLogo({variables: {logoName: newLogoText.value, logos: [], backgroundColor: '#FFFFFF', dimensions: 400,
                                                    borderColor: '#000000', borderWidth: 10, borderRadius: 20, padding: 0, margin: 0}});
                                            newLogoText.value = "";
                                        }
                                    }}
                                        >
                                        <input type="text" name="newLogoText" placeholder="Logo Name" ref={node => {newLogoText = node}}></input>
                                        <button type="submit" >Add Logo</button>
                                         <p id="help" style={{opacity: "0"}} onMouseOver={() => {document.getElementById("help").style.opacity = "1.0"}}
                                                                              onMouseLeave={() => {document.getElementById("help").style.opacity = "0.0"}}>
                                             Unable to edit texts/images. Unable to save texts/images to db.
                                             Unable to resize texts/images.
                                             No Login authentication. 
                                             <br/>
                                             <br/>
                                             Please be gentle.
                                         </p>
                                    </form>
                                </div>
                            </div>
                            )}</Mutation>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
