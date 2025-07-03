import { useEffect, useState } from "react";
import axios from "axios";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL =
    import.meta.env.VITE_API_URL || "https://bhiworkshop-1.onrender.com";

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/payment/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(res.data);
      } catch (error) {
        console.error("Error fetching payments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [API_URL]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Payments</h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-left text-sm">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Payment ID</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payments.map((pay) => (
                <tr key={pay._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{pay.user?.username || "N/A"}</td>
                  <td className="px-6 py-4">{pay.course?.title || "N/A"}</td>
                  <td className="px-6 py-4">{pay.paymentId}</td>
                  <td className="px-6 py-4">${pay.amount}</td>
                  <td className="px-6 py-4">{pay.user?.contact || "N/A"}</td>
                  <td className="px-6 py-4">
                    {new Date(pay.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payment;
