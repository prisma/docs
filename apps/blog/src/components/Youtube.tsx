/**
 * Embeds a YouTube video using an iframe.
 * playerVars accepts any valid parameters from:
 * https://developers.google.com/youtube/player_parameters
 */

type YoutubeProps = {
  videoId: string;
  width?: number | string;
  height?: number | string;
  playerVars?: Record<string, string | number | boolean>;
};

export const Youtube = ({
  videoId,
  width = "100%",
  playerVars = {},
}: YoutubeProps) => {
  const numericWidth = typeof width === "string" ? parseInt(width, 10) : width;

  const params = new URLSearchParams();
  Object.entries(playerVars).forEach(([key, value]) => {
    params.set(key, String(value));
  });
  const queryString = params.toString();
  const src = `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ""}`;

  return (
    <iframe
      src={src}
      width={width}
      style={{aspectRatio: 16/9}}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube video player"
    />
  );
};
