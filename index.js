const db = require( './fakedatabase.js' )

const express = require( 'express' )
const app = express()
const port = 3000

//  GET /contacts
app.get( '/contacts', ( req, res ) => {
  const { phrase } = req.query
  //sort by name
  const contacts = db.sort( ( a, b ) => {
    nameA = a.name.toLowerCase()
    nameB = b.name.toLowerCase()
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
  } )
  //if phrase is provided, filter by name
  if ( phrase !== undefined ) {
    if ( phrase.length > 0 ) {
      const filteredContacts = contacts.filter( contact => {
        return contact.name.toLowerCase().includes( phrase.toLowerCase() )
      } )
      return res.status( 200 ).json( filteredContacts )
    }
    return res.status( 400 ).json()
  }
  //if no phrase is provided, return all contacts
  res.status( 200 ).json( contacts )
} )

//  GET /contacts/
app.get( '/contacts/:id/', ( req, res ) => {
  const { id } = req.params
  //filter by id
  const contact = db.filter( contact => {
    return contact.id === id
  } )
  //if contact is found, return contact
  contact.length > 0 ? res.status( 200 ).json( contact[ 0 ] ) : res.status( 404 ).json()
} )

//  DELETE /contacts/
app.delete( '/contacts/:id/', ( req, res ) => {
  const { id } = req.params
  //filter by id
  const contact = db.filter( contact => {
    return contact.id === id
  } )
  //if contact is found, delete contact
  if ( contact.length > 0 ) {
    db.splice( db.indexOf( contact[ 0 ] ), 1 )
    return res.status( 204 ).json( contact[ 0 ] )
  }
  res.status( 404 ).json()
} )

//Error handling
app.all( '*', ( req, res ) => res.status( 404 ).json() )

app.listen( port, () => {
  console.log( `Example app listening on port ${port}` )
} )