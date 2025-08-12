"use client";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  PinterestShareButton,
  PinterestIcon,
} from "next-share";

interface Post {
  slug: string;
  title: string;
}

export default function ShareButtons({ post }: { post: Post }) {
  const url = `http://192.168.100.6:3000/training/${post.slug}`;
  const title = post.title;

  return (
    <div className="flex gap-2">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={25} round />
      </FacebookShareButton>

      <PinterestShareButton url={url} media={url}>
        <PinterestIcon size={25} round />
      </PinterestShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={25} round />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={25} round />
      </WhatsappShareButton>
    </div>
  );
}
