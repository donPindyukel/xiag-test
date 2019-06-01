export const mapService = {
  pollResultsMapper(data: any, pollId: string) {
    const statData = data.filter(
      (item: any) => item.answers.questionId === pollId
    );
    return statData.map((item: any) => ({
      userId: item._id,
      userName: item.name,
      answerId: item.answers.answerId,
      answerTitle: item.result[0].answers[0].title
    }));
  }
};
