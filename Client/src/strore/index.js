import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#0B4EA2',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './LogoImg.png',
    fullDecal: './LogoImg.png',
})

export default state;