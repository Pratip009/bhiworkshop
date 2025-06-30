import PropTypes from "prop-types";

const UserTable = ({ users, handleDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Username</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Contact No.</th>
          <th className="border p-2">Role</th>
          <th className="border p-2">Enrolled</th>
          <th className="border p-2">Workshops</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.length > 0 ? (
          users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.contact}</td>
              <td className="border p-2 capitalize">{user.role}</td>
              <td className="border p-2">
                {user.purchasedCourses?.length > 0 ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-gray-500">No</span>
                )}
              </td>
              <td className="border p-2 text-left">
                {user.purchasedCourses?.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {user.purchasedCourses.map((entry, index) => {
                      const courseTitle = entry.course?.title || "Untitled";
                      const purchaseTime = entry.purchasedAt
                        ? new Date(entry.purchasedAt).toLocaleString()
                        : "Unknown time";

                      return (
                        <li key={index}>
                          <span className="font-semibold text-blue-700">
                            {courseTitle}
                          </span>
                          <br />
                          <span className="text-xs text-gray-500">
                            Enrolled at: {purchaseTime}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span className="text-gray-400 italic">None</span>
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center p-4">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default UserTable;
