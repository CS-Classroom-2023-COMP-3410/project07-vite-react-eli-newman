import { useState } from 'react';
import UserForm from '../components/UserForm';
import Button from '../components/Button';
import ShoppingCart from '../components/ShoppingCart';

function ProfilePage({ cart, onRemoveFromCart }) {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(true);

    const handleSubmit = (formData) => {
        setProfile(formData);
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Profile Page</h1>

            {isEditing ? (
                <div>
                    <h2>Edit Profile</h2>
                    <UserForm
                        onSubmit={handleSubmit}
                        initialData={profile || {}}
                    />
                </div>
            ) : (
                <div style={{
                    maxWidth: '400px',
                    margin: '0 auto',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                }}>
                    <h2>Your Profile</h2>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}

                    <Button onClick={() => setIsEditing(true)} variant="secondary">
                        Edit Profile
                    </Button>
                </div>
            )}

            {/* Show cart summary if there are items */}
            {cart.length > 0 && (
                <div style={{ marginTop: '30px', maxWidth: '350px', margin: '30px auto 0' }}>
                    <ShoppingCart cart={cart} onRemoveFromCart={onRemoveFromCart} />
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
