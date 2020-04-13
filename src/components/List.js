import React from 'react'
import ItemDetails from './ItemDetails'
import Item from './Item'

const List = ({ results, countries, flag, onDetailClick }) => {
    // API Request sent on initial page load for only names & codes, so you can see all the countries
    // Only after searching, another API request gets details for < 10 countries, and the 'details' button becomes available
  
    if (flag === true) return <div>No results </div>
    if (results.length === 1) return <ItemDetails results={results} />
    if (results.length > 1) {
      return results.map((item) => (
        <Item key={item.name} item={item} onDetailClick={onDetailClick} />
      ))
    }
    return countries.map((item) => (
      <div key={item.name} item={item}>
        {item.name}
      </div>
    ))
  }

  export default List