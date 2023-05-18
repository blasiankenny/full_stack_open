const Content = ({ parts }) => {
  let total = parts.reduce((acc, val) => {
    return (acc += val.exercises);
  }, 0);

  return (
    <div>
      {parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}

      <h3>total of {total} exercises</h3>
    </div>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const Courses = ({ courses }) => {
  return courses.map((course) => {
    return <Course course={course} />;
  });
};

export default Courses;
