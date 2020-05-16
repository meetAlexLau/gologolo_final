var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');
var LogoComponentModel = require('../models/LogoComponent');
var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            logoName: {
                type: GraphQLString
            },
            logos: {
                type: GraphQLList(GraphQLString)
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderWidth: {
                type: GraphQLInt
            },
            borderRadius: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var logoComponentType = new GraphQLObjectType({
    name: 'logoComponent',
    fields: function() {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            }
        }
    }
})

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            logoComponent: {
                type: logoComponentType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params) {
                    const logoComponentDetails = LogoComponentModel.findById(params.id).exec()
                    if(!logoComponentDetails) {
                        throw new Error('Error')
                    }
                    return logoComponentDetails
                }
            },
            logoComponents: {
                type: new GraphQLList(logoComponentType),
                resolve: function() {
                    const logoComponents = LogoComponentModel.find().exec()
                    if(!logoComponents) {
                        throw new Error('Error')
                    }
                    return logoComponents
                }
            },
            getLogoByText: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: params.text}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            },
            getLogosByTextContains: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: {$regex: params.text, $options: 'i'}}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    logoName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    logos: {
                        type: new GraphQLNonNull(GraphQLList(GraphQLString))
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            addLogoComponent: {
                type: logoComponentType,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function(root,params) {
                    const logoComponentModel = new LogoComponentModel(params);
                    const newLogoComponent= logoComponentModel.save();
                    if(!newLogoComponent) {
                        throw new Error('Error')
                    }
                    return newLogoComponent
                }
            },

            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    logoName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    logos: {
                        type: new GraphQLNonNull(GraphQLList(GraphQLString))
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id,
                        { logoName: params.logoName, logos: params.logos,
                            backgroundColor : params.backgroundColor, borderColor : params.borderColor,
                            borderWidth: params.borderWidth, borderRadius: params.borderRadius,
                            padding: params.padding, margin: params.margin, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            updateLogoComponent: {
                type: logoComponentType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return LogoComponentModel.findByIdAndUpdate(params.id,
                        {text: params.text, color:params.color, fontSize:params.fontSize, height: params.height, width: params.width},
                        function(err) { if(err) return next(err);
                        });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            },
            removeLogoComponent: {
                type: logoComponentType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoComponentModel.findByIdAndRemove(params.id).exec();
                    if(!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });