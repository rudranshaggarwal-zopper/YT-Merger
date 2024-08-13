<!-- When making the req to create playlist now (before sending for verifcation), will get this response:  -->

<!-- API URL : https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=AIzaSyDN5p_9PT67TOOKW18zYR5eDPVdrrz8Sgg -->

<!--
{
    "error": {
        "code": 403,
        "message": "Request had insufficient authentication scopes.",
        "errors": [
            {
                "message": "Insufficient Permission",
                "domain": "global",
                "reason": "insufficientPermissions"
            }
        ],
        "status": "PERMISSION_DENIED",
        "details": [
            {
                "@type": "type.googleapis.com/google.rpc.ErrorInfo",
                "reason": "ACCESS_TOKEN_SCOPE_INSUFFICIENT",
                "domain": "googleapis.com",
                "metadata": {
                    "service": "youtube.googleapis.com",
                    "method": "youtube.api.v3.V3DataPlaylistService.Insert"
                }
            }
        ]
    }
}

 -->
