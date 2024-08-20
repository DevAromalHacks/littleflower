import Link from 'next/link';

type ButtonProps = {
    title: string;
    href: string;
    className?: string; // Making className optional
    disabled?: boolean; // Adding disabled as an optional prop
};

const Button = ({ title, href, className, disabled = false }: ButtonProps) => {
    return (
        <Link href={href}>
            <button
                disabled={disabled}
                className={className ? className : 'py-3 px-6 rounded-xl text-black bg-white font-bold'}>
                {title}
            </button>
        </Link>
    );
};

export default Button;
