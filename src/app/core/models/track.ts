export interface Track {
    idTrack: number;
    nameTrack: string;
    userName: string;
    duration: string; // LocalTime có thể được biểu diễn dưới dạng string (HH:mm:ss)
    createdAt: string; // LocalDate có thể được biểu diễn dưới dạng string (YYYY-MM-DD)
    likeCount: number;
    viewCount: number;
    commentCount: number;
    urlTrack: string;
    image: string;
}