export default function index() {

    const config = {
        unsplash: {
            accessKey: 'S0eywkacHJBqhhAz8tbtsHRykLcbxgoAR2q2YJrREdc',
            secretKey: 'sSd8EQAhsYpt3ZWmyPA6AokiSnP4v70C0NxWO5H2odc',
            callbackUrl: 'http://localhost:3000/callback' // Ganti dengan URL callback yang sesuai
        }
    };

    const handleLogin = () => {
        const { accessKey, callbackUrl } = config.unsplash;
        const oauthUrl = `https://unsplash.com/oauth/authorize?client_id=${accessKey}&redirect_uri=${callbackUrl}&response_type=code&scope=&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections`;

        window.location.href = oauthUrl;
    };


    return (
        <button onClick={handleLogin}>Login with Unsplash</button>
    )
}
