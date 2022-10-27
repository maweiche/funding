import styled from 'styled-components'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { BookmarkIcon, BookmarkFilledIcon } from '../icons/Common'
import {useAccount} from 'wagmi'

const Bkmrk = styled.div`
  display: flex;
  min-height: 30px;
  &:hover {
    cursor: pointer;
  }
`

const Bookmark = ({ objectId, bookmarks }) => {
    const [marked, setMarked] = useState(false)
    const {address, isDisconnected} = useAccount()

    const updateBookmark = async (oid, newBookmarks) => {
        const config = {
          headers: {
            "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
            "Content-Type": "application/json"
          }
        }
        try {
          await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { 'bookmarks': `${newBookmarks}` }, config)
        } catch (error) {
          console.log(error)
        }
      }

    // TBD Tier 1 - https://app.clickup.com/t/32jy4wv
    // On useEffect, go through bookmarks array and find if `address` is part of the array
    // If yes, setMarked(true)

    const handleBookmark = () => {
        if (!marked){
            updateBookmark(objectId, bookmarks)
            // TBD
            // Add address to bookmarks array
            // Update Project with new bookmarks array
            setMarked(true)
        } else {
            updateBookmark(objectId, bookmarks)
            // TBD
            // Remove address from bookmarks array
            // Update Project with new bookmarks array
            setMarked(false)
        }
      }

    return <>
     {isDisconnected ? <></> :
     <Bkmrk onClick={() => { handleBookmark() }}>
        {!marked ? <BookmarkIcon width={20} /> : <BookmarkFilledIcon width={20} />}
    </Bkmrk>}
    </>
}

export default Bookmark