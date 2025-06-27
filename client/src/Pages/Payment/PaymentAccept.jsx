import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentAccept = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const course = location.state?.course;
  const [showModal, setShowModal] = useState(false);

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-semibold text-gray-700">
          No course details found. Please go back and select a course.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-white p-10 rounded-3xl shadow-[0px_10px_30px_rgba(0,0,0,0.1)] max-w-2xl text-center transform transition duration-500 hover:scale-105">
        <div className="absolute inset-0 bg-white rounded-3xl -z-10 shadow-[0px_15px_40px_rgba(0,0,0,0.2)]"></div>

        <h2 className="text-3xl font-bold text-gray-900">
          {course.title} from Bright Horizon Institute, New Jersey
        </h2>

        <p className="mt-4 text-lg font-semibold text-gray-700">
          This course will include:
        </p>
        <ul className="text-gray-700 text-lg mt-2 text-left mx-auto max-w-md space-y-2">
          <li className="flex items-center">
            ✅ Live sessions (Online/In-person)
          </li>
          <li className="flex items-center">
            ✅ Course duration:{" "}
            {course.CourseDuration?.calendarLength || "Not specified"}
          </li>
          <li className="flex items-center">
            ✅ 100% job placement support after completion
          </li>
        </ul>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 w-full py-3 bg-red-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-red-700 transition-all duration-300"
        >
          Click Here
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Enroll for this Course
            </h3>
            <p className="text-gray-700 mb-6">
              Please contact us at the details below to proceed with enrollment:
            </p>
            <p className="text-lg text-black font-semibold">
              📞 Phone: 2013771594 <br />
              📧 Admin@bhilearning.com
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentAccept;
