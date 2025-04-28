const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
          <h2 className="text-xl font-bold">{title}</h2>
          <p>{message}</p>
          <div className="flex justify-end space-x-4">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;
  