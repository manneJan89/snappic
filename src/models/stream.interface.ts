export interface IStream {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}

export interface IStreamResponse {
    totalDuration: string;
    effectiveDuration: string;
    overlappingStreams: string;
    streams: IStream[];
}