import Header from './Header';

interface PageLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="App" style={{ margin: '1rem' }}>
            <Header />
            {children}
        </div>
    );
};

export default PageLayout;
