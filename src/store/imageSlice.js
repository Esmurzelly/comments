import { createSlice } from "@reduxjs/toolkit";

import image_amy from '../images/avatars/image-amyrobson.webp';
import image_juli from '../images/avatars/image-juliusomo.webp';
import image_max from '../images/avatars/image-maxblagun.webp';
import image_ramses from '../images/avatars/image-ramsesmiron.webp';



const imageSlice = createSlice({
    name: 'images',
    initialState: {
        image: [
            {
                id: 1,
                name: 'amy',
                avatar: image_amy
            },
            {
                id: 2,
                name: 'juli',
                avatar: image_juli
            },
            {
                id: 3,
                name: 'max',
                avatar: image_max
            },
            {
                id: 4,
                name: 'ramses',
                avatar: image_ramses
            },
        ],
    },
    reducers: {}
})

export default imageSlice.reducer