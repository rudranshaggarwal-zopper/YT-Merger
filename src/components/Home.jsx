import { useEffect, useState } from "react";
import axios from "axios";
import youtubeApi from "../apis/youtubeApi.js";

import Cookies from "js-cookie";
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

export const Home = () => {
  const [firstlink, setFirstlink] = useState("");
  const [secondlink, setSecondLink] = useState("");
  const [mergedPlaylistName, setmergedPlaylistName] = useState("");
  const [mergedPlaylistVideos, setmergedPlaylistVideos] = useState([]);

  const [cookie, setCookie] = useState("");

  // console.log("APIKEY: ", import.meta.env.VITE_API_KEY) // "123"

  useEffect(() => {
    const getCookies = () => {
      //  document.cookie("accessToken")
      // console.log("accessToken from cookie", Cookies.get());
      setCookie(Cookies.get("accessToken"));
      return Cookies.get("accessToken");
    };

    getCookies();
  }, []);

  // const getPlaylist_data = async (passedId) => {

  //   try {
  //     const response = await youtubeApi.get("/playlists",{
  //       params:{

  //       }
  //     });
  //     // const response = await axios.post(options);
  //     console.log("id: ", response.data.data);
  //     const newData = response.data.data
  //     //push all the videos in a single array
  //     setmergedPlaylistVideos(prev => [...prev, ...newData])
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const getPlaylist_data = async (passedId) => {
    const options = {
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/playlistItems",
      params: {
        playlistId: passedId,
        part: "snippet",
        key: VITE_API_KEY,
        maxResults: 50,
      },
    };
    // const options = {
    //   method: "GET",
    //   url: "https://yt-api.p.rapidapi.com/playlist",
    //   params: {
    //     id: passedId,
    //   },
    //   headers: {
    //     "X-RapidAPI-Key": "d7915469bamshad3b5402e48d720p17027ejsn2916a8f99287",
    //     "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
    //   },
    // };

    try {
      const response = await axios.request(options);
      console.log(" getPlaylist_data response: ", response);
      // console.log("id: ", response.data.data);
      const newData = response.data.items;
      console.log("new data: -------- ", newData);
      //push all the videos in a single array
      setmergedPlaylistVideos((prev) => [...prev, ...newData]);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = (playlistArray) => {
    console.log("Playlist array: ", playlistArray);
    //have to get the id of the playlist link that'll be passed here

    // https://www.youtube.com/playlist?list=PLK2zhq9oy0K4yxwMmBPsXQ3NvaQSxw6rY

    // NAV: https://www.youtube.com/playlist?list=PLAA7vuUVUdOf-u8ldOqoFdUSxX8JoY5fE
    // TW: https://www.youtube.com/playlist?list=PLK2zhq9oy0K5VsljASObg3QJ-hNwxsB1H

    //split the link using the separator : "?list" and get the string starting from

    playlistArray.map((link) => {
      //get the id from the link
      console.log("link: ", link);
      let id = link.split("?list=");
      console.log("id: ", id[1]);
      // console.log("type: ", typeof id[1]) -> Is String

      //for each id call this function to get the videos from that playlist
      if (id[1]) {
        getPlaylist_data(id[1]);
      }
    });
  };

  // console.log(
  //   "mergedPlaylistVideos: 3 ",
  //   mergedPlaylistVideos && mergedPlaylistVideos[3]
  // );

  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-700">
        Hello world! , {cookie}
      </h1>
      <h2>- Rudransh here , Youtube playlist merger</h2>
      <h2>- For now for 2 playlists only</h2>
      <h2>
        - A person can also merge the playlist they created on my application ,
        for that I{"'"}ll keep a different form
      </h2>
      <p>Will provide 2 ways to merge the playlists</p>
      <ol type="1">
        <li>
          1) Keeping the playlists intact, that means the playlist will not be
          unfolded and will be merged like that, i.e keeping multiple folders
          inside a big folder
        </li>
        <li>
          2) Unfolding the playlists,i.e keeping multiple files(videos) from
          multiple folders(playlist) inside a single big folder(playlist)
        </li>
      </ol>

      <form className="flex justify-center items-center flex-col gap-2 mt-4">
        <input
          type="text"
          value={firstlink}
          onChange={(e) => setFirstlink(e.target.value)}
          placeholder="playlist 1"
          className="rounded-md px-4 py-2 w-[400px]"
        />
        <input
          type="text"
          value={secondlink}
          onChange={(e) => setSecondLink(e.target.value)}
          placeholder="playlist 2"
          className="rounded-md px-4 py-2 w-[400px]"
        />
        <input
          type="text"
          placeholder="Name of the merged playlist"
          className="rounded-md px-4 py-2 w-[400px]"
          value={mergedPlaylistName}
          onChange={(e) => setmergedPlaylistName(e.target.value)}
        />

        <button
          className="bg-blue-500 hover:bg-blue-800 transition-all duration-150 ease-in m-2"
          onClick={(e) => {
            e.preventDefault();
            if (
              firstlink.length == 0 ||
              secondlink.length == 0 ||
              mergedPlaylistName.length == 0
            ) {
              return alert("Input values are missing, please enter all values");
            }
            setmergedPlaylistVideos([]);
            getData([firstlink, secondlink]);
          }}
        >
          Merge the playlist using option 2 now
        </button>
      </form>

      <button>Export the created playlist into you{"'"}re account</button>
      <br />
      {/* <h1 className="underline text-red-800 text-3xl">
        <a href="http://localhost:3001/api/auth/google">Login with Google</a>
      </h1> */}

      <br />
      <div>mergedPlaylistVideos.length : {mergedPlaylistVideos.length}</div>
      <br />

      {mergedPlaylistVideos.length > 0 && (
        <>
          <h1>Merged playlist</h1>
          <h2 className="text-3xl text-red-400 underline text-bold">
            Playlist Name : {mergedPlaylistName}
          </h2>
          {mergedPlaylistVideos.map((vid) => {
            return (
              <div key={vid.id} className="bg-blue-900 p-2 m-3 rounded-lg">
                <img src={vid.snippet?.thumbnails?.default?.url} />
                <div>Title: {vid.snippet.title}</div>
                <div>VideoID: {vid.snippet.resourceId.videoId}</div>
                <div>
                  Youtube Video Link:
                  <a
                    target="_block"
                    href={`https://www.youtube.com/watch?v=${vid.snippet.resourceId.videoId}`}
                  >
                    Video Link 🔗
                  </a>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
