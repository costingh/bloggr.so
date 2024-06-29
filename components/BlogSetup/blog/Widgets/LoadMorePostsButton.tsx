'use client'

import React from 'react'
import { Box } from "@chakra-ui/react";

function LoadMorePostsButton({loadMorePosts} : {loadMorePosts: any}) {
  return (
    <Box className='px-4 py-1 b border-1 border-[#ccc] mx-auto' onClick={loadMorePosts}>Load more posts</Box>
  )
}

export default LoadMorePostsButton