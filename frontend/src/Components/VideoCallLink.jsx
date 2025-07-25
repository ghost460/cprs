import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminpanel from "../adminpanel/Adminpanel";

const VideoCallLink = ({ appointmentId }) => {
  const [link, setLink] = useState(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/appointment/${appointmentId}/permission`)
      .then((res) => setAllowed(res.data.isAllowed));
    axios.get(`/api/video/${appointmentId}`).then((res) => {
      if (res.data?.meetingLink) setLink(res.data.meetingLink);
    });
  }, [appointmentId]);

  if (!allowed)
    return (
      <Adminpanel>
        {" "}
        <p>Video call will be available after appointment is confirmed.</p>
      </Adminpanel>
    );

  return (
    <Adminpanel>
      <div>
        {link ? (
          <a href={link} target="_blank" rel="noreferrer">
            Join Video Call
          </a>
        ) : (
          <p>Waiting for video session to start...</p>
        )}
      </div>
    </Adminpanel>
  );
};

export default VideoCallLink;
