import { useState } from 'react'

 function Loadmore (numItem) {
     const [numberItems, setNumberItems] = useState(0)

     const loadMoreItems = (arraylength) => {
        const newNumberItems = Math.min(numberItems + numItem, arraylength)
        setNumberItems(newNumberItems)
     }
  return {
    loadMoreItems,
    numberItems
  }
}

export default Loadmore