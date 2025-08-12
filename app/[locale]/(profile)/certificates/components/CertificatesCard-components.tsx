import { Link } from "@/i18n/routing";
import SvgQlementineCertificate from "@/components/icons/svg/qlementine-certificate";
import { Download  } from "lucide-react";
interface Certificate {
  id: number;
  certificate_url: string;
  course_name: string;
}

interface CertificatesCardComponentsProps {
  certificate: Certificate;
}

const CertificatesCardComponents: React.FC<CertificatesCardComponentsProps> = ({ certificate }) => {
  return (
    <div className="card Certificates-Card">
      <div className="card-body p-0">
        <div className="d-flex">
          <div className="flex-shrink-0">
            <SvgQlementineCertificate
              width={50}
              hanging={100}
              color="#ffc107"
            />
          </div>
          <div className="flex-grow-1 d-flex justify-content-between align-items-center ms-3">
            <h6 className="card-title mb-2 one-row">{certificate.course_name}</h6>
            {certificate.certificate_url && (
              <Link
                href={certificate.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon btn-buy btn-custom-primary btn-primary btn-sm p-2"
              >
          
                <Download size={17} strokeWidth={2} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificatesCardComponents