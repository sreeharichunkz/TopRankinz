import React, { useState } from 'react';
import commentApi from '../../api/user/profile/profileComment';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddComment = ({profileId , fetchProfileData , reply=false , commentReplyId}) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const {currentUser} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if(currentUser){

            if(reply){
                try {
                    const response = await commentApi.createReply( profileId,commentReplyId,comment);            
        
                    setSuccess(response.message);
                    setComment(''); 
                    fetchProfileData();
                } catch (err) {
                    setError('Error adding reply');
                    console.error(err);
                }
            }
            else{
                try {
                    const response = await commentApi.create( profileId,comment);            
        
                    setSuccess(response.message);
                    setComment(''); 
                    fetchProfileData();
                } catch (err) {
                    setError('Error adding comment');
                    console.error(err);
                }

            }

        }
        else{
            navigate('/login');
        }

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-outfit-medium text-color-3 dark:text-color-5">Add {reply?'Reply':'Comment'}:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={`shadow-xl mt-1 p-3 outline-none ${reply?'bg-color-6':''} block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    rows="2"
                    placeholder={`Type your ${reply?'Reply':'Comment'}...`}
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            
            <button type="submit" className="bg-color-1 text-white px-4 py-2 rounded-md">Post {reply?'Reply':'Comment'}</button>
        </form>
    );
};

export default AddComment;
