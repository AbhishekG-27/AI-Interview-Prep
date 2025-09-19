const UserInterviews = ({ interviews }: { interviews: Interview[] }) => {
  return (
    <div>
      {interviews.map((interview) => {
        return (
          <div key={interview.id} className="p-4 mb-4 border rounded">
            <h2 className="text-xl font-bold mb-2">{interview.role}</h2>
            <p className="text-gray-600">
              Date: {new Date(interview.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-800 mt-2">{interview.level}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserInterviews;
