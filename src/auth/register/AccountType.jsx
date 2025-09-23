import React, { useState } from 'react';
import { accountTypes } from "../../../constants/index.js";



export default function AccountType() {
    const [selectedType, setSelectedType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const handleContinue = async () => {
        if (!selectedType) return;

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));




    };

    return (
        <div id="account">
            <div className="max-w-4xl mx-auto py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-outfit text-green mb-2">Account Type</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {accountTypes.map(({ type, title,icon  }) => (
                        <div
                            key={type}
                            onClick={() => handleTypeSelect(type)}
                            className='brick '
                        >
                            <div>
                                <h3 className="text-xl flex-center font-outfit text-green">{title}</h3>
                            </div>
                            <div
                                className={`p-3 rounded-xl mr-4 ${
                                    selectedType === type ? 'bg-green text-white' : 'bg-transparent text-gray-600'
                                }`}
                            >
                                <div className="icon" >
                                    <img src={icon} alt={'icon'}/>

                                </div>


                            </div>


                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleContinue}
                        disabled={!selectedType || isLoading}
                        className={`px-8 py-3 rounded-xl font-medium text-white transition-all duration-200 ${
                            selectedType && !isLoading
                                ? 'bg-blue hover:bg-green shadow-lg hover:shadow-xl'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Setting up your account...
                            </div>
                        ) : (
                            'Continue'
                        )}
                    </button>
                </div>
            </div>

        </div>
    );
}