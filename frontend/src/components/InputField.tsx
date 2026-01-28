import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
    label: string;
    error?: string;
    multiline?: boolean;
    isTextArea?: boolean; // Alias for multiline
    rows?: number;
    select?: boolean;
    options?: { label: string; value: string | number }[];
}

export const InputField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, InputFieldProps>(
    ({ label, error, className = '', multiline = false, isTextArea = false, rows = 4, select = false, options = [], type, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const isActuallyTextArea = multiline || isTextArea;
        const isPassword = type === 'password';

        const inputClasses = `
            ${isActuallyTextArea ? 'textarea' : 'input'}
            ${error
                ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10'
                : ''}
            ${isPassword ? 'pr-12' : ''}
        `;

        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className={`mb-6 flex flex-col w-full relative group ${className}`}>
                <label className="label">
                    {label} {props.required && <span className="text-red-500 font-black">*</span>}
                </label>

                <div className="relative">
                    {select ? (
                        <select
                            ref={ref as React.Ref<HTMLSelectElement>}
                            className={`${inputClasses} appearance-none cursor-pointer`}
                            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
                        >
                            {options.map((opt, i) => (
                                <option key={i} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    ) : isActuallyTextArea ? (
                        <textarea
                            ref={ref as React.Ref<HTMLTextAreaElement>}
                            className={inputClasses}
                            rows={rows}
                            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                        />
                    ) : (
                        <>
                            <input
                                ref={ref as React.Ref<HTMLInputElement>}
                                className={inputClasses}
                                type={inputType}
                                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                            />
                            {isPassword && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 focus:outline-none transition-colors"
                                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </>
                    )}
                </div>

                {error && (
                    <p className="mt-1 text-xs font-bold text-red-600">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

InputField.displayName = 'InputField';
