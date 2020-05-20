Query
{
  logos{
    _id
    logoName
    logos
    backgroundColor
    borderColor
    borderWidth
    borderRadius
    padding
    margin
    lastUpdate    
  }

  logo(id:"") {
    _id
    logoName
    logos
    backgroundColor
    borderColor
    borderWidth
    borderRadius
    padding
    margin
    lastUpdate 
  }

  logoComponents{
    _id
    text
    color
    fontSize
    height
    width
  }

  logoComponent(id:"") {
    _id
    text
    color
    fontSize
    height
    width
  }
}

Mutation
{
  addLogo(
    logoName: ""
    logos: []
    backgroundColor: ""
    borderColor: ""
    borderWidth: ""
    borderRadius: ""
    padding: ""
    margin: ""
  )

  addLogoComponent(
    text: ""
    color: ""
    fontSize: ""
    height: ""
    width: ""
  )

  updateLogo(
    _id: ""
    logoName: ""
    logos: ""
    backgroundColor: ""
    borderColor: ""
    borderWidth: ""
    borderRadius: ""
    padding: ""
    margin: ""
  )

  updateLogoComponent(
    _id: ""
    text: ""
    color: ""
    fontSize: ""
    height: ""
    width: ""
  )

  removeLogo(id:"") {
    _id
    logoName
  }

  removeLogoComponent(id:"") {
    _id
    text
  }
}