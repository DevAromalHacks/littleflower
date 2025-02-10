import { MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots{
    return{
        rules:{
            userAgent: '*',
            allow: '/',
            disallow: []
        },
        sitemap: 'http://lfemhs.com/sitemap.xml'
    }
}